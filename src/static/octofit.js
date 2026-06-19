document.addEventListener("DOMContentLoaded", () => {
  const statusContainer = document.getElementById("octofit-status");
  const workoutsContainer = document.getElementById("octofit-workouts");
  const usersContainer = document.getElementById("octofit-users");
  const workoutForm = document.getElementById("workout-form");
  const userForm = document.getElementById("user-form");
  const workoutMessage = document.getElementById("workout-message");
  const userMessage = document.getElementById("user-message");

  async function fetchJson(path, options) {
    const response = await fetch(path, options);
    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new Error(errorBody?.detail || `Request failed: ${response.status}`);
    }
    return await response.json();
  }

  function renderWorkouts(data) {
    workoutsContainer.innerHTML = "";
    if (!data.workouts || data.workouts.length === 0) {
      workoutsContainer.textContent = "No workouts available.";
      return;
    }

    const list = document.createElement("ul");
    data.workouts.forEach((workout) => {
      const item = document.createElement("li");
      item.textContent = `${workout.name} — ${workout.duration_minutes} minutes`;
      list.appendChild(item);
    });
    workoutsContainer.appendChild(list);
  }

  function renderUsers(data) {
    usersContainer.innerHTML = "";
    if (!data.users || data.users.length === 0) {
      usersContainer.textContent = "No users available.";
      return;
    }

    const list = document.createElement("ul");
    data.users.forEach((user) => {
      const item = document.createElement("li");
      item.textContent = `${user.name} <${user.email}>`;
      list.appendChild(item);
    });
    usersContainer.appendChild(list);
  }

  function showMessage(element, text, isError = false) {
    element.textContent = text;
    element.className = isError ? "error" : "success";
    element.classList.remove("hidden");
    setTimeout(() => element.classList.add("hidden"), 4000);
  }

  async function loadData() {
    try {
      const status = await fetchJson("/octofit/status");
      statusContainer.textContent = `${status.service} is ${status.status}`;
    } catch (error) {
      statusContainer.textContent = "Unable to load Octofit status.";
    }

    try {
      const workouts = await fetchJson("/octofit/workouts");
      renderWorkouts(workouts);
    } catch (error) {
      workoutsContainer.textContent = "Unable to load workouts.";
    }

    try {
      const users = await fetchJson("/octofit/users");
      renderUsers(users);
    } catch (error) {
      usersContainer.textContent = "Unable to load users.";
    }
  }

  workoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("workout-name").value.trim();
    const duration = parseInt(document.getElementById("workout-duration").value, 10);

    try {
      await fetchJson("/octofit/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, duration_minutes: duration }),
      });
      showMessage(workoutMessage, "Workout created successfully.");
      workoutForm.reset();
      const workouts = await fetchJson("/octofit/workouts");
      renderWorkouts(workouts);
    } catch (error) {
      showMessage(workoutMessage, error.message || "Unable to create workout.", true);
    }
  });

  userForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("user-name").value.trim();
    const email = document.getElementById("user-email").value.trim();

    try {
      await fetchJson("/octofit/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      showMessage(userMessage, "User created successfully.");
      userForm.reset();
      const users = await fetchJson("/octofit/users");
      renderUsers(users);
    } catch (error) {
      showMessage(userMessage, error.message || "Unable to create user.", true);
    }
  });

  loadData();
});
