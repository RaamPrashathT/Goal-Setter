function getData() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error fetching post:", error));
}

function postData() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "foo",
            body: "bar",
            userId: 1,
        })
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error fetching post:", error));
}

function updateData() {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({
            id: 1,
            title: "foo",
            body: "bar",
            userId: 1,
        })
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error fetching post:", error));
}

function deleteData() {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error fetching post:", error));
}

getData();
postData();  
updateData();
deleteData();     