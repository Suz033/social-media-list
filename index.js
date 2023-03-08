const BASE_URL = 'https://user-list.alphacamp.io/'
const USER_URL = `${BASE_URL}api/v1/users/`

const userList = document.querySelector('#user-list')
const data = []

axios
  .get(USER_URL)
  .then(response => {
    data.push(...response.data.results)
    console.log(data)
    addUser(data)
  })
  .catch(error => console.log(error))

function addUser(data) {
  let userData = ''
  data.forEach(ele => {
    userData += `
    <!-- user -->
    <div class="m-3 mt-5 mb-5 d-flex align-items-end user-block" data-id="user-${ele.id}">
      <!-- user img -->
      <img src="https://files.slack.com/files-pri/T0B06GY6S-F04PN800WA3/clipart214152.png?pub_secret=21369b7410" class="card-img-top rocket" alt="user-img">
      <img src="${ele.avatar}"
        class="card-img-top user-img" alt="user-img">
      <div class="card-body d-flex justify-content-evenly">
        <!-- add btn -->
        <button 
          type="button" 
          class="btn btn-primary user-btn add-btn btn-lg"
        >
          Add
        </button>
        <!-- view btn -->
        <button 
          type="button" 
          class="btn btn-primary user-btn view-btn btn-lg" 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal"
          data-id="${ele.id}"
        >
          View
        </button>
      </div>
    </div>`
  })
  console.log(userData)
  userList.innerHTML = userData
}

function showModal(id) {
  const modalImg = document.querySelector('#modal-img')
  const modalContent = document.querySelector('#modal-content')

  modalImg.innerHTML = ''
  modalContent.innerText = ''

  axios
    .get(`${USER_URL}${id}`)
    .then(response => {
      const data = response.data
      modalImg.innerHTML = `
            <!-- rocket img -->
            <img src="https://files.slack.com/files-pri/T0B06GY6S-F04PN800WA3/clipart214152.png?pub_secret=21369b7410"
              class="card-img-top modal-rocket" alt="user-img">
            <!-- user img -->
            <img src="${data.avatar}" class="card-img-top modal-img" alt="user-img">
      `
      const male = 'fa-mars'
      const female = 'fa-venus'
      let gender = ''

      console.log(data.gender)
      if (data.gender === 'male') {
        gender = male
      } else if (data.gender === 'female') {
        gender = female
      }
      
      let modalContentHTML = `
            <h1 class="modal-title">${data.name} ${data.surname} <i class="fa-solid ${gender}"></i></h1>
            <hr>
            <div class="modal-text">
              <p><i class="fa-solid fa-cake-candles"></i> ${data.age}</p>
              <p><i class="fa-regular fa-calendar"></i> ${data.birthday}</p>
              <p><i class="fa-regular fa-envelope"></i> ${data.email}</p>
              <p><i class="fa-solid fa-earth-americas"></i> ${data.region}</p>
            </div>
      `      

      modalContent.innerHTML = modalContentHTML
    })
    .catch(error => console.log(error))
}


userList.addEventListener('click', function clickListBtn(event) {
  if (event.target.matches('.view-btn')) {
    showModal(Number(event.target.dataset.id))
    console.log(Number(event.target.dataset.id))
  }
})