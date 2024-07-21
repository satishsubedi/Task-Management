let taskList = [];
// Reading input data from the element
const totalhoursperweek = 24 * 7;
const handleOnSubmit = (e) => {
  // const elm = document.querySelector("#task");
  // console.log(e);
  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hour = +newForm.get("hour");

  // storing the input data
  const obj = {
    task,
    hour,
    uniqueid: randomIdGenerator(),
    type: "entry",
  };
  // checking hours for the entry
  const existinghours = allocatedHours();
  if (existinghours + hour > totalhoursperweek) {
    return alert("sorry time is over");
  }
  // console.log(task, hr);
  taskList.push(obj);
  // console.log(taskList);
  displayEntryList();
  const elmTask = document.querySelector("#task");
  elmTask.value = "";
  const elmHour = document.querySelector("#hour");
  elmHour.value = "";
};
//Displaying EntryList Function
const displayEntryList = () => {
  console.log(taskList);
  let str = "";
  const entryList = document.getElementById("entryList");
  const entryTaskList = taskList.filter((item) => item.type === "entry");
  entryTaskList.map((item, i) => {
    str += `<tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hour}</td>
    <td class="text-end">
      <button onclick="handleOnDelete('${
        item.uniqueid
      }')" class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button onclick="switchTask('${
        item.uniqueid
      }','bad')"class="btn btn-success">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
  </tr>`;
  });

  entryList.innerHTML = str;
  allocatedHours();
};
//Displaying BadList Function
const displayBadList = () => {
  console.log(taskList);
  let str = "";
  const entryList = document.getElementById("badList");
  const badListEntry = taskList.filter((item) => item.type === "bad");
  badListEntry.map((item, i) => {
    str += `<tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hour}</td>
    <td class="text-end">
      <button onclick="handleOnDelete('${
        item.uniqueid
      }')" class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button onclick="switchTask('${
        item.uniqueid
      }','entry')"class="btn btn-success">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    </td>
  </tr>`;
  });

  entryList.innerHTML = str;

  document.getElementById("savedhours").innerText = badListEntry.reduce(
    (acc, item) => acc + item.hour,
    0
  );
};
//Create an uniqueID
const randomIdGenerator = () => {
  str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
  let id = "";
  for (let i = 0; i < 6; i++) {
    const randomnum = Math.floor(Math.random() * str.length);
    id += str[randomnum];
  }
  return id;
};
// Delete button
const handleOnDelete = (id) => {
  if (window.confirm("Are you sure ,you want to delete")) {
    taskList = taskList.filter((item) => item.uniqueid !== id);
    displayEntryList();
  }
};
// Swtiching Task
const switchTask = (id, type) => {
  taskList.map((item) => {
    if (item.uniqueid === id) {
      item.type = type;
    }
    return item;
  });
  displayEntryList();
  displayBadList();
};

const allocatedHours = () => {
  const totalhours = taskList.reduce((acc, item) => acc + item.hour, 0);
  document.getElementById("allocatedhours").innerText = totalhours;
  return totalhours;
};
