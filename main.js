let color = document.getElementById("color");
let createBtn = document.getElementById("createBtn");
let list = document.getElementById("list");

let cursor = {
  x: null,
  y: null,
};

let note = {
  dom: null,
  x: null,
  y: null,
};

let getAllNote;

createBtn.onclick = () => {
  let newNote = document.createElement("div");

  newNote.classList.add("note");
  newNote.innerHTML = `
  <span class="close">x</span>
          <textarea
            placeholder="Write content...."
            rows="10"
            cols="30"
          ></textarea>`;

  getAllNote = document.querySelectorAll(".note");

  newNote.style.borderColor = color.value;
  newNote.style.boxShadow = `0 20px 40px ${color.value}`;
  newNote.style.zIndex = getAllNote.length + 1;
  list.appendChild(newNote);
};

document.addEventListener("mousedown", (event) => {
  if (event?.target.classList.contains("note")) {
    cursor = {
      x: event?.clientX,
      y: event?.clientY,
    };

    note = {
      dom: event?.target,
      x: event?.target?.getBoundingClientRect().left,
      y: event?.target?.getBoundingClientRect().top,
    };
  }
});

document.addEventListener("mousemove", (event) => {
  if (note.dom == null) return;

  getAllNote = document.querySelectorAll(".note");

  let currentCursor = {
    x: event.clientX,
    y: event.clientY,
  };

  let distance = {
    x: currentCursor.x - cursor.x,
    y: currentCursor.y - cursor.y,
  };

  note.dom.style.cursor = "grab";
  note.dom.style.left = note.x + distance.x + "px";
  note.dom.style.top = note.y + distance.y + "px";

  getAllNote?.forEach((node, index) => {
    if (node == note.dom) {
      node.style.zIndex = getAllNote.length;
    } else {
      node.style.zIndex = index;
    }
  });
});

document.addEventListener("mouseup", () => {
  if (note.dom == null) return;
  note.dom.style.cursor = "auto";
  note.dom = null;
});

document.addEventListener("click", (event) => {
  if (event?.target?.classList.contains("close")) {
    event?.target?.parentNode?.remove();
  }
});
