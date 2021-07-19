export const getFileIDFromURL = (url) => {
  if (!url) return null;

  let fileId = "";
  const NULL_STRING = "_^^__/**_NULL_STRING_**/__^^_";

  const _TEMPLATE = [
    {
      head: "https://drive.google.com/uc?id=",
      tail: "&export=download",
    },
    {
      head: "https://drive.google.com/file/d/",
      tail: "/view?usp=",
    },
    {
      head: "https://drive.google.com/open?id=",
      tail: NULL_STRING,
    },
  ];

  _TEMPLATE.forEach((template) => {
    if (url.includes(template.head)) {
      fileId = url.split(template.head)[1];
    }

    if (url.includes(template.tail)) {
      fileId = fileId.split(template.tail)[0];
    }
  });

  return !!fileId ? fileId : null;
};

export const getLinkViewImage = (url: string): string | null => {
  const id = getFileIDFromURL(url);
  const _TEMPLATE = "https://drive.google.com/file/d/FILE_ID/view?usp=drivesdk";
  return _TEMPLATE.replace("FILE_ID", id);
};
