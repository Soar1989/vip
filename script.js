const form = document.querySelector('#parse-form')
const mediaInput = document.querySelector('#media-url')
const apiSelect = document.querySelector('#api-select')
const returnBtn = document.querySelector('.card-back .return')
const timerBtn = document.querySelector('.card-back .timer')
const setTimer = document.querySelector('.set-timer')
const timer30 = document.querySelector('.set-timer-30')
const timer60 = document.querySelector('.set-timer-60')
const timer90 = document.querySelector('.set-timer-90')
const cancelBtn = document.querySelector('.cancel-btn')
const card = document.querySelector('.card')
const player = document.querySelector('.player')

let timer = null
let delay = null
let currentVideoURL = ''

// 自适应窗口高度
window.onresize = function () {
  document.body.style.minHeight = window.innerHeight + 'px'
}
window.onresize()

// 视频加载函数
function loadVideo() {
  if (!currentVideoURL) return
  let selectedApi = apiSelect.value

  if (selectedApi === 'custom') {
    const customApi = prompt('请输入自定义视频解析接口（需包含 ?url= ）:', 'https://jx.77flv.cc/?url=')
    if (customApi && customApi.trim() !== '') {
      selectedApi = customApi.trim()
    } else {
      apiSelect.value = 'https://jx.dmflv.cc/?url='
      selectedApi = apiSelect.value
    }
  }

  player.src = selectedApi + encodeURIComponent(currentVideoURL)
}

// 提交表单解析
form.addEventListener('submit', (e) => {
  e.preventDefault()
  currentVideoURL = mediaInput.value.trim()
  if (!currentVideoURL) return

  mediaInput.blur()
  card.classList.add('turn-to-back')

  if (delay) window.clearTimeout(delay)
  delay = window.setTimeout(() => {
    loadVideo()
  }, 600)
})

// 线路切换
apiSelect.addEventListener('change', () => {
  if (currentVideoURL) {
    loadVideo()
  }
})

// 返回首页
returnBtn.addEventListener('click', () => {
  player.src = ''
  card.classList.remove('turn-to-back')
  mediaInput.value = ''
  currentVideoURL = ''
  if (delay) window.clearTimeout(delay)
})

// 定时器功能
timerBtn.addEventListener('click', () => {
  setTimer.classList.toggle('show-set-timer')
})

function setCloseTimer(minutes) {
  setTimer.classList.remove('show-set-timer')
  if (timer) window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    returnBtn.click()
  }, minutes * 60 * 1000)
}

timer30.addEventListener('click', () => setCloseTimer(30))
timer60.addEventListener('click', () => setCloseTimer(60))
timer90.addEventListener('click', () => setCloseTimer(90))

cancelBtn.addEventListener('click', () => {
  setTimer.classList.remove('show-set-timer')
  if (timer) {
    window.clearTimeout(timer)
    timer = null
  }
})