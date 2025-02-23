fetch("http://localhost:4000/api/courses")
    .then(res=>res.json())
    .then(data=>console.log(data))