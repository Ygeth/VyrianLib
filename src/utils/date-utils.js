// DD/MM/YY
function formatDate(date) {
  if (!date) return null;
  try {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.log("date: " + date);
    console.log(error);
    return null;
  }
}

// YYYY-MM-DD
function dateToVuetify(date) {
  if(date) {
    let aux = new Date(date);
    const year = aux.getFullYear();
    const month =
      aux.getMonth() + 1 < 10 ? `0${aux.getMonth() + 1}` : aux.getMonth() + 1;
    const day = aux.getDate() < 10 ? `0${aux.getDate()}` : aux.getDate();

    return `${year}-${month}-${day}`;
  } else {
    return null;
  }
}

// MM/DD/YYYY
function dateToRestDate(date) {
    let aux = new Date(date);
    return `${aux.getMonth() + 1}/${aux.getDate()}/${aux.getFullYear()}`;
}

// MM/DD/YYYY
function formatVuetifyDate(date) {
  const aux = date.split("-");
  return `${aux[1]}/${aux[2]}/${aux[0]}`;
}

// DD/MM/YYYY
function dateToDDMMYYYY(date) {
  let aux = new Date(date);

  const day = aux.getDate() < 10 ? `0${aux.getDate()}` : aux.getDate();
  const month = aux.getMonth() + 1 < 10 ? `0${aux.getMonth() + 1}`: aux.getMonth() + 1;
  return `${day}/${month}/${aux.getFullYear()}`;
}

// HH:MM
function dateToHHMM(date){
  if(date != null){

    let auxTime = new Date(date);
    const hour = auxTime.getHours() < 10 ? `0${auxTime.getHours()}` : auxTime.getHours();
    const min = auxTime.getMinutes() < 10 ? `0${auxTime.getMinutes()}`: auxTime.getMinutes();

    return `${hour}:${min}`;
  }
}

function calcularEdad(date) {
  if (date) {
    let aux = new Date(date);
    var ageDifMs = Date.now() - aux.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  } else {
    return "";
  }
}

function datePlusDays(fecha, days) {
  let date = new Date(fecha);
  const auxDate = new Date(Number(date));

  auxDate.setDate(Number(auxDate.getDate()) + Number(days));
  return auxDate;
}

function dateDiff(startDate, endDate){
  let start = new Date(startDate).setHours(0,0,0,0);
  let end = new Date(endDate).setHours(0,0,0,0);

  return start - end >= 0
}

function setHoursToDate(date, dateHours){
  return new Date(date).setHours(new Date(dateHours).getHours(), new Date(dateHours).getMinutes());
}

export {
    formatDate,
    dateToVuetify,
    dateToRestDate,
    formatVuetifyDate,
    dateToDDMMYYYY,
    dateToHHMM,
    calcularEdad,
    datePlusDays,
    dateDiff,
    setHoursToDate
};