function formatDateFromEpoch(mongoTime) {
  // Construct a new Date object using the epoch time in milliseconds
  const date = new Date(mongoTime);

  // Get individual date components
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // Month is zero-indexed
  const monthShortString = date.toLocaleString('default', { month: 'short' });
  const day = ("0" + date.getUTCDate()).slice(-2);
  const hours = ("0" + date.getUTCHours()).slice(-2);
  const minutes = ("0" + date.getUTCMinutes()).slice(-2);
  const seconds = ("0" + date.getUTCSeconds()).slice(-2);

  // Construct the GMT time string
  const gmtTimeString = hours + ":" + minutes + ":" + seconds + " GMT";

const gmtTimeStringNoSeconds = hours + ":" + minutes + " GMT";

  // Construct the date string
  const dateString = day  + "-" + monthShortString + "-" + year;

  return { date: dateString, time: gmtTimeStringNoSeconds } ;
}


// function formatDateFromEpoch(epochTime) {
//     // Construct a new Date object using the epoch time in milliseconds
//     const date = new Date(epochTime * 1000);

//     // Get individual date components
//     const year = date.getUTCFullYear();
//     const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // Month is zero-indexed
//     const monthShortString = date.toLocaleString('default', { month: 'short' });
//     const day = ("0" + date.getUTCDate()).slice(-2);
//     const hours = ("0" + date.getUTCHours()).slice(-2);
//     const minutes = ("0" + date.getUTCMinutes()).slice(-2);
//     const seconds = ("0" + date.getUTCSeconds()).slice(-2);

//     // Construct the GMT time string
//     const gmtTimeString = hours + ":" + minutes + ":" + seconds + " GMT";

//   const gmtTimeStringNoSeconds = hours + ":" + minutes + " GMT";

//     // Construct the date string
//     const dateString = day  + "-" + monthShortString + "-" + year;

//     return { date: dateString, time: gmtTimeStringNoSeconds };
// }

module.exports = { formatDateFromEpoch }

// // Example usage
// const epochTime = 1617705036; // Example Epoch time (Unix timestamp)
// const formattedDateTime = formatDateFromEpoch(epochTime);
// console.log("Date:", formattedDateTime.date);
// console.log("GMT Time:", formattedDateTime.time);