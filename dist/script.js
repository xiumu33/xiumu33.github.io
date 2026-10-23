(() => {
  "use strict";
  const data = window.HOMEPAGE;
  const main = document.getElementById("main-content");
  if (!data) {
    main.textContent = "Unable to load homepage content. 请检查 content.js 的格式，然后刷新页面。";
    return;
  }

  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined && text !== null) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const safeUrl = (value) => {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const url = new URL(value.trim(), document.baseURI);
      if (["https:", "http:", "mailto:"].includes(url.protocol)) return value.trim();
      // Local files work when index.html is opened directly.
      if (url.protocol === "file:" && !/^[a-z][a-z\d+.-]*:/i.test(value)) return value.trim();
    } catch { /* An incomplete URL is displayed as plain text. */ }
    return "";
  };
  const link = (label, value, className) => {
    const url = safeUrl(value);
    const node = element(url ? "a" : "span", label, className);
    if (url) node.href = url;
    return node;
  };

  // Small, safe formatting helper: content is always inserted as text nodes.
  const inline = (target, value) => {
    const text = String(value ?? "");
    const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
    let cursor = 0;
    for (const match of text.matchAll(pattern)) {
      target.append(document.createTextNode(text.slice(cursor, match.index)));
      target.append(match[1] ? element("strong", match[1]) : link(match[2], match[3]));
      cursor = match.index + match[0].length;
    }
    target.append(document.createTextNode(text.slice(cursor)));
    return target;
  };
  const resources = (items = []) => {
    const valid = items.filter((item) => safeUrl(item.url));
    if (!valid.length) return null;
    const row = element("div", null, "resource-links");
    valid.forEach((item) => {
      const wrapper = element("span");
      wrapper.append("[", link(item.label, item.url), "]");
      row.append(wrapper);
    });
    return row;
  };
  const section = (key) => {
    const block = element("section");
    block.id = key;
    block.setAttribute("aria-labelledby", key + "-heading");
    const heading = element("h2", data.headings?.[key] || key);
    heading.id = key + "-heading";
    block.append(heading);
    main.append(block);
    return block;
  };

  const iconPaths = {
    github: {
      color: "#181717",
      path: "M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.2.8-.5v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.5 5.7.4.4.8 1.1.8 2.2v3.1c0 .3.2.6.8.5A11.3 11.3 0 0 0 12 .7z",
    },
    kaggle: { color: "#20beff", path: "M5 1h3v13l9-9h4L11 15l10 9h-4L8 16v8H5V1z" },
    scholar: { color: "#4285f4", path: "M12 3 0 10l12 7 9-5.3V19h2v-8L12 3zm-7 12v4c4 3 10 3 14 0v-4l-7 4-7-4z" },
    linkedin: { color: "#087dae", path: "M3 0h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm2 9v11h3V9H5zm1.5-5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM11 9v11h3v-6c0-3 4-3 4 0v6h3v-7c0-5-5-5-7-2V9h-3z" },
    document: { color: "#527bbd", path: "M4 1h10l6 6v16H4V1zm10 2v5h5l-5-5zM7 11v2h10v-2H7zm0 4v2h10v-2H7zm0 4v2h7v-2H7z" },
  };
  const icon = (name) => {
    const info = iconPaths[name] || iconPaths.document;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", info.path);
    path.setAttribute("fill", info.color);
    svg.append(path);
    return svg;
  };

  const profile = data.profile || {};
  const name = profile.name || "Your Name";
  document.documentElement.lang = data.language || "en";
  document.title = name + " | Personal Homepage";
  document.querySelector('meta[name="description"]').content = profile.description || name + " — Personal academic homepage.";
  const header = document.getElementById("profile");
  const info = element("div", null, "profile-info");
  info.append(element("h1", name));
  if (profile.position) info.append(element("h3", profile.position, "position"));
  const affiliation = element("div", null, "affiliation");
  [profile.department, profile.institution].filter(Boolean).forEach((line) => affiliation.append(element("p", line)));
  if (profile.email) {
    const email = element("p");
    email.append("Email: ", link(profile.email, "mailto:" + profile.email));
    affiliation.append(email);
  }
  info.append(affiliation);
  const social = element("nav", null, "social-links");
  social.setAttribute("aria-label", "Profile links");
  (profile.links || []).filter((item) => safeUrl(item.url)).forEach((item) => {
    const anchor = link("", item.url, "social-link");
    anchor.setAttribute("aria-label", item.label);
    anchor.title = item.label;
    anchor.append(icon(item.icon));
    social.append(anchor);
  });
  if (social.childElementCount) info.append(social);
  header.append(info);
  if (safeUrl(profile.photo)) {
    const photo = element("img", null, "portrait");
    photo.alt = profile.photoAlt || name;
    photo.width = 150;
    photo.height = 170;
    photo.addEventListener("error", () => {
      photo.replaceWith(element("div", name, "portrait-fallback"));
    }, { once: true });
    photo.src = profile.photo;
    header.append(photo);
  } else {
    header.style.gridTemplateColumns = "1fr";
  }
  const github = (profile.links || []).find((item) => item.icon === "github" && safeUrl(item.url));
  const corner = document.getElementById("github-corner");
  if (github) {
    corner.href = github.url;
    corner.setAttribute("aria-label", "Visit " + name + " on GitHub");
  } else corner.remove();

  if (data.biography?.length) {
    const block = section("biography");
    data.biography.forEach((text) => block.append(inline(element("p"), text)));
  }
  if (data.news?.length) {
    const block = section("news");
    const list = element("ul", null, "news-list");
    data.news.forEach((entry) => {
      const item = element("li");
      if (entry.date) item.append("[" + entry.date + "] ");
      inline(item, entry.text);
      list.append(item);
    });
    block.append(list);
  }
  if (data.projects?.length) {
    const block = section("projects");
    const list = element("ul", null, "project-list");
    data.projects.forEach((entry) => {
      const item = element("li");
      item.append(link(entry.title, entry.url, "project-title"));
      if (entry.description) item.append(inline(element("div"), entry.description));
      const row = resources(entry.links);
      if (row) item.append(row);
      list.append(item);
    });
    block.append(list);
  }
  const paperList = (papers) => {
    const list = element("ul", null, "paper-list");
    papers.forEach((paper) => {
      const item = element("li");
      item.append(link(paper.title, paper.url, "paper-title"));
      if (paper.authors?.length) {
        const authors = element("div", null, "authors");
        paper.authors.forEach((author, index) => {
          if (index) authors.append(", ");
          authors.append(element(author.self ? "strong" : "span", author.name));
        });
        item.append(authors);
      }
      if (paper.venue) item.append(inline(element("div", null, "venue"), paper.venue));
      const row = resources(paper.links);
      if (row) item.append(row);
      list.append(item);
    });
    return list;
  };
  const groups = (data.publications || []).filter((group) => group.papers?.length);
  if (groups.length) {
    const block = section("publications");
    const heading = block.querySelector("h2");
    if (data.publicationNote) heading.append(" ", element("span", data.publicationNote, "heading-note"));
    const scholar = (profile.links || []).find((item) => item.icon === "scholar" && safeUrl(item.url));
    if (scholar) {
      const wrapper = element("span", null, "scholar-link");
      wrapper.append(" [", link(scholar.label, scholar.url), "]");
      heading.append(wrapper);
    }
    groups.forEach((group) => {
      if (group.year) block.append(element("h3", group.year, "year"));
      block.append(paperList(group.papers));
    });
  }
  if (data.preprints?.length) section("preprints").append(paperList(data.preprints));
  ["education", "experience", "awards"].forEach((key) => {
    if (!data[key]?.length) return;
    const block = section(key);
    const list = element("ul", null, "dated-list");
    data[key].forEach((entry) => {
      const item = element("li");
      item.append(element("span", entry.date, "entry-date"), inline(element("span"), entry.text));
      list.append(item);
    });
    block.append(list);
  });
  if (data.service?.length) {
    const block = section("service");
    const list = element("ul");
    data.service.forEach((text) => list.append(inline(element("li"), text)));
    block.append(list);
  }
  if (data.teaching?.length) {
    const block = section("teaching");
    const list = element("ul", null, "teaching-list");
    data.teaching.forEach((entry) => {
      const item = element("li");
      item.append(element("span", entry.year), element("span", entry.term), inline(element("span", null, "course"), entry.course));
      list.append(item);
    });
    block.append(list);
  }
  const footer = document.getElementById("footer");
  footer.append(element("p", "© " + new Date().getFullYear() + " " + name));
  if (data.updatedAt) footer.append(element("p", "Last updated: " + data.updatedAt));
  const credit = element("p");
  credit.append("Layout inspired by ", link("Hou Pong Chan’s homepage", "https://kenchan0226.github.io/"), ".");
  footer.append(credit);
})();

