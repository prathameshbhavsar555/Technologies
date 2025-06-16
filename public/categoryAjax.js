let searchCategory=(str)=>{
    let xhttp=new XMLHttpRequest();
    
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let tableBody=document.getElementById("searchCategory");
            tableBody.innerHTML="";

            let jsonObj=JSON.parse(this.responseText);

            if(jsonObj.length===0){
                let row=document.createElement("tr");
                row.innerHTML= `<td colspan="7" class="text-center text-danger"> No Category found</td>`;

                tableBody.appendChild(row);
            }else{
                jsonObj.forEach((item,index)=>{
                    let row=document.createElement("tr");

                    row.innerHTML=`
                    <td>${index+1}</td>
                    <td>${item.name}</td>
                    <td><a href='/delcategoryByid?id=${item.id}' class='btn btn-danger btn-sm'> Delete </a> </td>
                    <td><a href='/updatecategoryByid?id=${item.id}' class='btn btn-warning btn-sm'> Update </a> </td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        }
    };
    xhttp.open("GET","/searchCategory?sd=" +str,true);
    xhttp.send();
}