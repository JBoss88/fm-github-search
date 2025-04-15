"use strict";

const colorWrapper = document.querySelector(".color-wrapper");
const switchName = () => {
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");
  const light = document.querySelector(".light");
  light.textContent = light.textContent === "DARK" ? "LIGHT" : "DARK";
  sun.classList.toggle("hidden");
  moon.classList.toggle("hidden");
};

colorWrapper.addEventListener("click", switchName);

const searchBtn = document.querySelector(".search");

const getUsername = () =>
  document.querySelector("input[type='text']").value.trim();

searchBtn.addEventListener("click", () => {
  const username = getUsername();
  if (!username) return console.error("Enter a valid username");
  getData(username);
});

const getData = async (user) => {
  try {
    const res = await fetch(`https://api.github.com/users/${user}`);
    const data = await res.json();

    const date = new Date(data.created_at);
    const usFormatted = date.toLocaleDateString("en-US");
    if (data.blog === "") data.blog = "Not available";
    // Optional: handle not found or rate limit error
    if (data.message)
      return console.error("User not found or error:", data.message);

    // Map class names to data values
    const map = {
      ".pfp": { prop: "src", value: data.avatar_url },
      ".name": { prop: "textContent", value: data.name },
      ".userAt": { prop: "textContent", value: `@${data.login}` },
      ".joined": { prop: "textContent", value: usFormatted },
      ".bio": { prop: "textContent", value: data.bio },
      ".repos": { prop: "textContent", value: data.public_repos },
      ".followers": { prop: "textContent", value: data.followers },
      ".following": { prop: "textContent", value: data.following },
      ".location": { prop: "textContent", value: data.location },
      ".twitter": { prop: "textContent", value: data.twitter_username },
      ".blog": { prop: "textContent", value: data.blog },
      ".company-link": { prop: "textContent", value: data.company },
    };

    for (const selector in map) {
      const el = document.querySelector(selector);
      if (el) {
        const value = map[selector].value;
        el[map[selector].prop] =
          value !== null && value !== undefined ? value : "Not available";
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
};
