let searchStaff = (str) => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tableBody = document.getElementById("searchStaff"); // class, not ID
            tableBody.innerHTML = "";

            let jsonObj = JSON.parse(this.responseText);

            if (jsonObj.length === 0) {
                let row = document.createElement("tr");
                row.innerHTML = `<td colspan="6" class="text-center text-danger"> No Staff Found </td>`;
                tableBody.appendChild(row);
            } else {
                jsonObj.forEach((staff, index) => {
                    let row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${staff.name}</td>
                        <td>${staff.email}</td>
                        <td>${staff.contact_no}</td>
                        <td>${staff.salary}</td>
                        <td>
                            <div class="d-flex justify-content-center gap-2">
                                <a href="/updatestaff?id=${staff.staff_id}" class="btn btn-warning btn-sm">Update</a>
                                <a href="/deletestaff?id=${staff.staff_id}" class="btn btn-danger btn-sm"
                                    onclick="return confirm('Are you sure you want to delete this staff member?')">Delete</a>
                            </div>
                        </td>
                    `;

                    tableBody.appendChild(row);
                });
            }
        }
    };

    xhttp.open("GET", "/searchStaff?sd=" + str, true);
    xhttp.send();
};
