let searchtable = (str) => {
   let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tableBody = document.getElementById("searchtable");
            tableBody.innerHTML = "";

            let jsonObj = JSON.parse(this.responseText);

            if (jsonObj.length === 0) {
                let row = document.createElement("tr");
                row.innerHTML = `<td colspan="4" class="text-center text-danger"> No Table Found </td>`;
                tableBody.appendChild(row);
            } else {
                jsonObj.forEach((item) => {
                    let row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${item.table_id}</td>
                        <td>${item.capacity}</td>
                        <td>
                          ${item.availability_status === 'Available'
                              ? '<span class="badge bg-success">Available</span>'
                              : '<span class="badge bg-danger">Occupied</span>'}
                        </td>
                        <td>
                          <a href="/updatetable?id=${item.table_id}" class="text-primary me-3">
                            <i class="fas fa-edit"></i>
                          </a>
                          <a href="/deletetable?id=${item.table_id}" class="text-danger" onclick="return confirm('Are you sure you want to delete this table?');">
                            <i class="fas fa-trash-alt"></i>
                          </a>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        }
    };

    xhttp.open("GET", "/searchtable?sd=" + encodeURIComponent(str), true);
    xhttp.send();
};
