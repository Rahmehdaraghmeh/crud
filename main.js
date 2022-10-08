let courseName=document.getElementById("courseName");
let courseCategory=document.getElementById("courseCategory");
let coursePrice=document.getElementById("coursePrice");
let courseDescription =document.getElementById("courseDescription");
let data=document.getElementById("data");
let search=document.getElementById("search");
let error=document.getElementsByClassName("error");
let courses=[];
if(localStorage.getItem("ALDATA")!=null){
  courses=JSON.parse(localStorage.getItem("ALDATA"));
 displaycourse();}
 else{
    courses=[];
 }
//let courses=[]; //   اريه علميه  لتخزين الكورسات مضافه  
function createcourse(){
  if( validatecourse())
{let course={
    cName:courseName.value,
    cCategory:courseCategory.value,
    cPrice:coursePrice.value,
 cDescription:courseDescription.value,
}
courses.push(course);//هيك انا ضقت على الاريه 
 localStorage.setItem("ALDATA",JSON.stringify(courses));
displaycourse();//ككل ما بدي ا يف الاريه بدي اضيفه بالجدول 
clearinput();
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
}
else
{Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: '<a href="">Why do I have this issue?</a>'
  })

}}
function clearinput(){
courseName.value="";
courseCategory.value="";
 coursePrice.value="";
courseDescription.value="";
}
function displaycourse() {
    let result='';
    for(let i=0;i<courses.length;i++){
result+=   `<tr>
<td>${i}</td>
<td>${ courses[i].cName}</td>
<td>${ courses[i].cCategory}</td>
<td>${ courses[i].cPrice}</td>
<td>${ courses[i].cDescription}</td>
<td><button  onclick="updatecoures(${i})"><i class="fa-solid fa-pen"></i>   </button></td>

<td><button class="delete" onclick="deletcourses(${i})"> <i class="fa-sharp fa-solid fa-trash"></i></button></td>
</tr>
`
    }
   
    data.innerHTML=result;
}

function searchcourses(){
   let searchvalue=search.value;
   let result='';
    for(let i=0;i<courses.length;i++){
        if(courses[i].cName.toLowerCase().includes(searchvalue.toLowerCase()))
result+=   `<tr>
<td>${i}</td>
<td>${ courses[i].cName}</td>
<td>${ courses[i].cCategory}</td>
<td>${ courses[i].cPrice}</td>
<td>${ courses[i].cDescription}</td>
<td><button  onclick="updatecoures(${i})"><i class="fa-solid fa-pen"></i>   </button></td>

<td><button class="delete" onclick="deletcourses(${i})"> <i class="fa-sharp fa-solid fa-trash"></i></button></td>
</tr>
`;
    }
   
    data.innerHTML=result;
}
function updatecoures(id ){
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    courses[id].cName=courseName.value;
    courses[id].cCategory=courseCategory.value;
    courses[id].cPrice=coursePrice.value;
    courses[id].cDescription=courseDescription.value;
    localStorage.setItem("ALDATA",JSON.stringify(courses));
    displaycourse();
    clearinput();

}
function deletcourses(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          courses.splice(id,1)
          localStorage.setItem("ALDATA",JSON.stringify(courses));
      displaycourse();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )}
          else{
            Swal.fire(
              ' fail Deleted!'
            )
          
        }
      })
  ;
}
function validatecourse(){
    let cnameRegex=/^[A-Z][a-z0-9]{3,15}$/;
   console.log( cnameRegex.test(courseName.value));
    if(!cnameRegex.test(courseName.value)){
    error[0].style.display="block";
return false;
    }
    else{
        error[0].style.display="none";
        return true;
    }
}

courseName.addEventListener('blur',validatecourse);