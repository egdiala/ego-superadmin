export const fullDateFormatter = (date: any) => {
  const inputDate = new Date(date);
  const formattedDate = inputDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate;
};

export const ISODateFormatter = (d: any) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const timeStampFormatter = (createdAt: any, showTime = false) => {
  const updatedDate = {
    seconds: createdAt?.seconds ?? createdAt?._seconds,
    nanoseconds: createdAt?.nanoseconds ?? createdAt?._nanoseconds,
  };

  // Combine the seconds and nanoseconds to create a full timestamp
  const timestamp =
    updatedDate?.seconds * 1000 + updatedDate?.nanoseconds / 1000000;

  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Format the date to a readable format
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the time to a readable format
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  if (showTime) {
    return {
      date: formattedDate,
      time: formattedTime,
    };
  } else {
    return formattedDate;
  }
};