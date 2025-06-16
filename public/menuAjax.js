let searchMenu = (str) => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tableBody = document.getElementById("searchMenu");
            tableBody.innerHTML = "";

            let jsonObj = JSON.parse(this.responseText);

            if (jsonObj.length === 0) {
                let row = document.createElement("tr");
                row.innerHTML = `<td colspan="7" class="text-center text-danger"> No Menu Found </td>`;
                tableBody.appendChild(row);
            } else {
                jsonObj.forEach((item, index) => {
                    let row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td><input type="text" class="form-control-plaintext" value="${item.item_name}" readonly></td>
                        <td><input type="text" class="form-control-plaintext" value="${item.category_id}" readonly></td>
                        <td><input type="text" class="form-control-plaintext" value="${item.price}" readonly></td>
                        <td><input type="text" class="form-control-plaintext" value="${item.description}" readonly></td>
                        <td>
                            <img src="/uploads/${item.image}" alt="menu image" width="50" height="50"
                                style="object-fit: cover; border-radius: 6px;">
                        </td>
                        <td>
                            <div class="d-flex gap-2 justify-content-center">
                                <a href="/updatemenus?id=${item.id}" class="btn btn-warning btn-sm">Update</a>
                                <a href="/deletemenus?id=${item.id}" class="btn btn-danger btn-sm"
                                    onclick="return confirm('Are you sure you want to delete this menu?')">Delete</a>
                            </div>
                        </td>
                    `;

                    tableBody.appendChild(row);
                });
            }
        }
    };

    xhttp.open("GET", "/searchmenu?sd=" + str, true);
    xhttp.send();
};
