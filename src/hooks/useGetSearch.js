import { useMutation } from "react-query";
import API from "../axios/api";

function humanFileSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

const useGetSearch = () => {
  return useMutation({
    mutationFn: async (query) => {
      const { data } = await API.search(query);
      let rows = [];
      for (let result in data) {
        if (data[result].length > 0) {
          let localRows = (data[result] ?? []).map((row) => {
            return {
              key: row?.id,
              name: row?.filename,
              host: result,
              location: row?.location,
              size: humanFileSize(row?.size),
              action: `http://${result}:6969/file?location=${row?.location}`,
            };
          });
          rows = rows.concat(localRows);
        }
      }
      return rows;
    },
  });
};

export default useGetSearch;
