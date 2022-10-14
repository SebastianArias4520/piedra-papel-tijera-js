class Entidad {

    url = "https://chiquiskillbackend.herokuapp.com/api/";

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    findAll() {
        return new Promise((fullfill, reject) => fetch(this.url + this.endpoint, {
            headers: { "Content-Type": "application/json" },
            method: "GET",
            mode: "cors",
        }).then(response => response.json().then(response.ok ? fullfill : reject, reject), reject));
    }

    findById(id) {
        return new Promise((fullfill, reject) => fetch(this.url + this.endpoint + id, {
            headers: { "Content-Type": "application/json" },
            method: "GET",
            mode: "cors",
        }).then(response => response.json().then(response.ok ? fullfill : reject, reject), reject));
    }

    insert(object) {
        return new Promise((fullfill, reject) => fetch(this.url + this.endpoint, {
            body: JSON.stringify(object),
            headers: { "Content-Type": "application/json"},
            method: "POST",
            mode: "cors",
        }).then(response => response.json().then(response.ok ? fullfill : reject, reject), reject));        
    }

    update(object) {
        return new Promise((fullfill, reject) => fetch(this.url + this.endpoint, {
            body: JSON.stringify(object),
            headers: { "Content-Type": "application/json"},
            method: "PUT",
            mode: "cors",
        }).then(response => response.json().then(response.ok ? fullfill : reject, reject), reject)); 
    }
    deleteById(id) {
        return new Promise((fullfill, reject) => fetch(this.url + this.endpoint + id, {
            headers: { "Content-Type": "application/json" },
            method: "DELETE",
            mode: "cors",
        }).then(response => response.json().then(response.ok ? fullfill : reject, reject), reject));
    }

}