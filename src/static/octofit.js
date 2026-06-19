document.addEventListener("DOMContentLoaded", () => {
  const statusContainer = document.getElementById("octofit-status");
  const workoutsContainer = document.getElementById("octofit-workouts");
  const usersContainer = document.getElementById("octofit-users");

  async function fetchJson(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
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

  loadData();
});
