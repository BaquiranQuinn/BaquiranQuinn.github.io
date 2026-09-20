const toolkitData = [
  {
    name: "Wireshark",
    category: "Network Analysis",
    level: "Intermediate",
    description: "Packet sniffer used to inspect network traffic and diagnose suspicious activity."
  },
  {
    name: "Nmap",
    category: "Network Scanning",
    level: "Beginner",
    description: "Command-line tool for discovering hosts, open ports, and running services on a network."
  },
  {
    name: "Kali Linux",
    category: "Operating System",
    level: "Intermediate",
    description: "Linux distribution pre-loaded with penetration testing and security auditing tools."
  },
  {
    name: "Burp Suite",
    category: "Web App Security",
    level: "Intermediate",
    description: "Proxy and toolkit for testing web applications for vulnerabilities like injection and XSS."
  },
  {
    name: "OWASP ZAP",
    category: "Web App Security",
    level: "Beginner",
    description: "Open-source web app scanner used to find security issues early in development."
  },
  {
    name: "Metasploit",
    category: "Penetration Testing",
    level: "Advanced",
    description: "Framework for developing and executing exploit code against a target system in a lab setting."
  }
];

/**
 * @param {string} query - raw text typed by the user
 * @param {Array<Object>} data - the list to filter
 * @returns {Array<Object>} a new filtered array (never undefined)
 */
function filterToolkit(query, data) {

  if (!Array.isArray(data)) return [];


  const safeQuery = typeof query === "string" ? query.trim().toLowerCase() : "";


  if (safeQuery.length === 0) return data.slice();

  return data.filter((item) => {
    if (!item) return false;
    const haystack = [item.name, item.category, item.level]
      .filter((val) => typeof val === "string")
      .join(" ")
      .toLowerCase();
    return haystack.includes(safeQuery);
  });
}

/**
 * @param {Array<Object>} list - items to render
 * @param {HTMLElement} container - the empty element to fill
 */
function renderToolkit(list, container) {
  if (!container) return;


  container.innerHTML = "";


  if (!Array.isArray(list) || list.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "toolkit-empty-message";
    emptyMsg.textContent = "No tools match your search. Try a different keyword.";
    container.appendChild(emptyMsg);
    return;
  }

  list.forEach((item) => {
    const card = document.createElement("div");
    card.className = "toolkit-card";

    const title = document.createElement("h3");
    title.textContent = item.name || "Untitled tool";

    const meta = document.createElement("p");
    meta.className = "toolkit-meta";
    const category = item.category || "Uncategorized";
    const level = item.level || "Level N/A";
    meta.textContent = `${category} - ${level}`;

    const desc = document.createElement("p");
    desc.className = "toolkit-desc";
    desc.textContent = item.description || "No description available.";

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(desc);
    container.appendChild(card);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("toolkit-search");
  const listContainer = document.getElementById("toolkit-list");


  if (!searchInput || !listContainer) return;


  renderToolkit(filterToolkit("", toolkitData), listContainer);


  searchInput.addEventListener("input", (event) => {
    const rawValue = event.target.value;
    const filtered = filterToolkit(rawValue, toolkitData);
    renderToolkit(filtered, listContainer);
  });
});
