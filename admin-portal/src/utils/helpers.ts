export const isArrayOfStrings = (arr: any): arr is string[] => {
  if (Array.isArray(arr)) {
    if (arr.length > 0) {
      return arr.every((value) => typeof value === "string");
    }
  }
  return false;
};

export function returnFileSize(nbr: number) {
  if (nbr < 1024) {
    return `${nbr} bytes`;
  } else if (nbr >= 1024 && nbr < 1048576) {
    return `${(nbr / 1024).toFixed(1)} KB`;
  } else if (nbr >= 1048576) {
    return `${(nbr / 1048576).toFixed(1)} MB`;
  }
}

export function getFileUrl(idFile: string | string[] | undefined) {
  if (typeof idFile === "string")
    return `${process.env.BASE_URL}/file/${idFile}`;
  if (
    Array.isArray(idFile) &&
    idFile.length > 0 &&
    typeof idFile[0] === "string"
  )
    return `${process.env.BASE_URL}/file/${idFile[0]}`;
  return "/default-supplement-thumbnail.jpg";
}
