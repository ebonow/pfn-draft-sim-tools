const TEAM = 'CHI';
let toggledOn = false;

const toggleMyPicks = (team) => {
  toggledOn = !toggledOn;

  const picks = document.getElementById('draft-order-list-container').getElementsByClassName('draft-card')

  const isMyPick = p => (p.firstChild.firstChild.alt === team);
  for (const p of picks) {
    p.style.display = (toggledOn && !isMyPick(p)) ? 'none' : 'flex';
  }
}

const btnImg = document.createElement('img');
btnImg.style.filter = 'invert(1)';
btnImg.src = "/mockdraft/sim-control-icons/scouting-report-icon.png";

const btnTxt = document.createElement('p');
btnTxt.innerText = 'MY PICKS';

const newButton = document.createElement('button');
newButton.classList.add('sim-management-button-div');
newButton.addEventListener("click", () => toggleMyPicks(TEAM), false);
newButton.appendChild(btnImg);
newButton.appendChild(btnTxt);

const btnContainer = document.getElementById('sim-management-buttons');
btnContainer.prepend(newButton);