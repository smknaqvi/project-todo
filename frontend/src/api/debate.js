import { client } from "./client";



export function postDebate(debate) {
  return client.post(`/debate`, {
    tier: debate.tier,
    question: debate.question,
    debaterIds: debate.debaterIds,
    responseIds: debate.responseIds,
    date: debate.date,
  });
}

export function putDebate(debate) {
  if (debate._id === undefined || debate._id === null) {
    return postDebate(debate);
  } else {
    return client.put(`/debate/${debate._id}`, {
      tier: debate.tier,
      question: debate.question,
      debaterIds: debate.debaterIds,
      responseIds: debate.responseIds,
      date: debate.date,
      isEvaluated: debate.isEvaluated,
    });
  }
}
export function updateRatingCount(
  responseid,
  newcount
) {
  return client.put(`/debate-responses/update-count/${responseid}`, {
    count : newcount
  });
}

export function getResponsesByIDs(ids) {
  return client.get(`/debate-responses/get-from-list-of-ids/`, {params : {responseids : ids}});
}


export function updateAssignedResponses(
  response,
  userid
) {
  return client.put(`/debate-responses/put-assigned-responses/${userid}`, {
    response : response,
  });
}

export function getResponsesByID(id) {
  return client.get(`/debate-responses/${id}`);
}

export function putResponseRating(
  id,
  userId,
  value
) {
  return client.put(`/debate-responses/put-rating/${id}`, {
    userId,
    value
  });
}

export function putResponseAvg(
  id,
  avg
) {
  return axios.put(`${API_ENDPOINT}/debate-responses/put-avg/${id}`, {
    avg
  });
}


export function getDebate(id) {
  return client.get(`/debate/${id}`);
}

export function getDebateByUserId(id) {
  return client.get(`/debate/get-by-userid/${id}`);
}

export function getAllDebates() {
  return client.get(`/debate`);
}

export function getDebateByTier(tier) {
  return client.get(`debate/get-by-tier/${tier}`);
}
export function getAssignedResponses(id) {
  return client.get(`/debate-responses/get-assigned-responses/${id}`);
}




