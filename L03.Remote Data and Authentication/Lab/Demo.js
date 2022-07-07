function demo() {
  fetch('...url', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
