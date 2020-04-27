
const months = ['Jan', 'Feb', 'Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];

const getReadableDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}/${months[d.getMonth()]}/${d.getFullYear()}`
}

export default getReadableDate;