let selectedRow = null;

// Show Alters
function showAlerts(message, className) {
    const div = document.createElement("div");
    div.classList = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Clear All Fields
function clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#mobile").value = "";
}

// Add Data
document.querySelector("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const name = document.querySelector("#name").value;
    const mobile = document.querySelector("#mobile").value;

    // Validate
    let list = document.querySelector("#contact-list");
    let tr = list.getElementsByTagName("tr");
    function validateMobile() {
        for (let i = 0; i < tr.length; i++) {
            let tdMobile = tr[i].getElementsByTagName("td")[1];
            console.log(tdMobile)
            if (tdMobile) {
                let mobileValue = parseInt(tdMobile.textContent);
                if (mobileValue === parseInt(mobile)) {
                    return true;
                }
            }
        }
    }
    if (name === "" || mobile === "") {
        showAlerts("Please fill the details below", "danger");
    }else if(validateMobile()===true){
        return showAlerts("Contact Number is already exist", "danger")
    }
    else {
        if(selectedRow === null) {
            list = document.querySelector("#contact-list");
            tr = list.getElementsByTagName("tr");
            const row = document.createElement("tr")
            row.innerHTML = `
                <td>${name}</td>
                <td>${mobile}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlerts("Contact Detail Added", "success");

        }
        else {
            selectedRow.children[0].textContent = name;
            selectedRow.children[1].textContent = mobile;
            selectedRow = null;
            showAlerts("Contact Detail Edited", "info")
        }
        clearFields()
    }
})

// Edit Data

document.querySelector("#contact-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#name").value = selectedRow.children[0].textContent;
        document.querySelector("#mobile").value = selectedRow.children[1].textContent;

    }
})

// Delete Data
document.querySelector("#contact-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlerts("Contact Detail Deleted", "danger");
    }
})

// Search Details
document.querySelector("#search-input").addEventListener("keyup", (e) => {
    target = e.target;
    let filter = target.value;
    let myTable = document.querySelector("#my-Table");
    let tr = myTable.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        let tdName = tr[i].getElementsByTagName("td")[0];
        let tdMobile = tr[i].getElementsByTagName("td")[1];
        if (tdName && tdMobile) {
            let nameValue = tdName.textContent;
            let mobileValue = tdMobile.textContent;

            if (nameValue.toUpperCase().indexOf(filter.toUpperCase()) > -1 || mobileValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        } else {
            tr[i].style.display = ""
        }
    }
})
validateMobile()
function validateMobile() {
    let myTable = document.querySelector("#my-Table");
    let tr = myTable.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        let tdMobile = tr[i].getElementsByTagName("td")[1];
        if (tdMobile) {
            let mobileValue = parseInt(tdMobile.textContent);
            if (mobileValue === parseInt(mobile)) {
                return;
            }
        }
    }
    return true;
}

