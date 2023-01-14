const generateUI = () => {
  const floors = document.getElementById("floors").value;
  const lifts = document.getElementById("lifts").value;
  const ui = document.getElementById("ui");

  const flr = document.createElement("h3");
  flr.innerHTML = `Total Floors are -${floors}`;

  const lif = document.createElement("h3");
  lif.innerHTML = `Total Lifts are -${lifts}`;
  ui.appendChild(flr);
  ui.appendChild(lif);
};

document.getElementById("generate-ui").addEventListener("click", generateUI);
