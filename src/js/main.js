const building__data = {
  floors: 0,
  lifts: 0,
};

let generateBuilding = document.querySelector(
  ".generate__lift__simulation__ui"
);

let backButton = document.querySelector(".previous__page");

backButton.addEventListener("click", () => {
  document.getElementsByClassName("lift__simulation__ui")[0].style.display =
    "none";

  document.getElementsByTagName("section")[0].style.display = "flex";

  remove_floors();
});

generateBuilding.addEventListener("click", () => {
  building__data.floors = document.querySelector("#floors").value;
  building__data.lifts = document.querySelector("#lifts").value;

  if (building__data.floors == "" || building__data.lifts == "") {
    alert("Please enter values");
  } else if (building__data.floors > 8) {
    alert("Only max 8 floors can be generated");
  } else if (building__data.lifts > 10) {
    alert("Only max 10 lifts can be generated");
  } else {
    document.getElementsByClassName("lift__simulation__ui")[0].style.display =
      "block";

    document.getElementsByTagName("section")[0].style.display = "none";

    buildFloors();
  }
});

const buildFloors = () => {
  let no_Of_Floors = building__data.floors;
  let no_Of_Lifts = building__data.lifts;

  for (let i = no_Of_Floors; i > 0; i--) {
    let floor = document.createElement("div");
    floor.className = "floor";

    let buttons = document.createElement("div");
    buttons.className = "buttons";

    //up btn
    let upBtn = document.createElement("button");
    let upBtnText = document.createTextNode("UP");
    upBtn.className = "up__button";
    upBtn.appendChild(upBtnText);

    //down btn
    let downBtn = document.createElement("button");
    let downBtnText = document.createTextNode("DOWN");
    downBtn.className = "down__button";
    downBtn.appendChild(downBtnText);

    buttons.appendChild(upBtn);
    buttons.appendChild(downBtn);

    floor.appendChild(buttons);

    document.querySelector(".lift__simulation__ui").appendChild(floor);

    if (i == no_Of_Floors) {
      upBtn.style.display = "none";
    }
    if (i == 1) {
      downBtn.style.display = "none";
    }
  }

  //lift
  let lifts = document.createElement("div");
  lifts.className = "lifts";

  for (let l = 1; l <= no_Of_Lifts; l++) {
    let lift = document.createElement("div");
    lift.className = "lift";
    lift.setAttribute("lift_availability", "available");

    let lift_gates = document.createElement("div");
    lift_gates.className = "lift_gates";

    let left_gate = document.createElement("div");
    left_gate.className = "left_gate";
    lift_gates.appendChild(left_gate);

    let right_gate = document.createElement("div");
    right_gate.className = "right_gate";
    lift_gates.appendChild(right_gate);

    lift.appendChild(lift_gates);

    lifts.appendChild(lift);
  }

  const all_floors = document.querySelectorAll(".floor");

  //attaching lifts to ground floor
  const last_floor = all_floors[all_floors.length - 1];
  last_floor.appendChild(lifts);

  //selecting all lifts
  let all_lifts = document.querySelectorAll(".lift");

  //select all up btns
  let all_up_btns = document.querySelectorAll(".up__button");

  //select all down btns
  let all_down_btns = document.querySelectorAll(".down__button");

  let number_of_up_btns = all_up_btns.length;

  let floor_number_array = [];

  for (let i = 0; i < all_lifts.length; i++) {
    //all lifts are initially at 1st floor
    floor_number_array.push(1);
  }

  //attaching click events on up btn
  all_up_btns.forEach((up_btn, idx) => {
    up_btn.addEventListener("click", () => {
      let floor_number = number_of_up_btns - idx;
      for (let i = 0; i < all_lifts.length; i++) {
        if (all_lifts[i].getAttribute("lift_availability") === "available") {
          all_lifts[i].setAttribute("lift_availability", "busy");
          up_btn.classList.add("active-btn");
          //call movelift

          lift_movement(
            all_lifts[i],
            floor_number,
            floor_number_array[i],
            all_floors[idx]
          );
          floor_number_array[i] = floor_number;
          break;
        }
      }
    });
  });

  //attaching click events on down btn
  all_down_btns.forEach((down_btn, idx) => {
    down_btn.addEventListener("click", () => {
      let floor_number = number_of_up_btns - idx;
      for (let i = 0; i < all_lifts.length; i++) {
        if (all_lifts[i].getAttribute("lift_availability") === "available") {
          all_lifts[i].setAttribute("lift_availability", "busy");
          down_btn.classList.add("active-btn");
          //call movelift
          lift_movement(
            all_lifts[i],
            floor_number,
            floor_number_array[i],
            all_floors[idx]
          );
          floor_number_array[i] = floor_number;
          break;
        }
      }
    });
  });
};

const lift_movement = (lift, floor_number, floor_value, selected_floor) => {
  lift.style.transform = `translateY(${-125 * (floor_number - 1)}px)`;

  let transition_duration = `${2 * Math.abs(floor_number - floor_value)}s`;
  lift.style.transition = transition_duration;

  setTimeout(() => {
    lift_gates_movement(lift);

    setTimeout(() => {
      lift.setAttribute("lift_availability", "available");
      selected_floor.children[0].children[0].classList.remove("active-btn") ||
        selected_floor.children[0].children[1].classList.remove("active-btn");
    }, 5000);
  }, 2 * Math.abs(floor_number - floor_value) * 1000);
};

const lift_gates_movement = (lift) => {
  let gates = lift.firstChild;

  setTimeout(() => {
    gates.children[0].classList.add("left_gate-move");
    gates.children[1].classList.add("right_gate-move");
  }, 1000);

  setTimeout(() => {
    gates.children[0].classList.remove("left_gate-move");
    gates.children[1].classList.remove("right_gate-move");
  }, 3000);
};

const remove_floors = () => {
  for (let i = building__data.floors; i > 0; i--) {
    let floor = document.querySelector(".floor");
    floor.remove();
  }
};
