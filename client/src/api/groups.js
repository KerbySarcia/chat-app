export function getGroups(axiosPrivate) {
  return axiosPrivate.get("/groups").then((res) => res.data);
}

export function deleteGroup({ axiosPrivate, id }) {
  return axiosPrivate.delete("/groups", { data: { id } });
}

export function createGroup({ axiosPrivate, groupName: name }) {
  return axiosPrivate.post("/groups", { name });
}
