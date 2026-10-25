const status = (message, error = false) => {
  const output = document.getElementById('message')
  output.textContent = message
  output.dataset.error = String(error)
}
const loadDemo = async () => {
  const response = await fetch('./demo.json')
  if (!response.ok) throw new Error(`Не удалось загрузить запись: HTTP ${response.status}`)
  const data = await response.json()
  document.getElementById('runtime').textContent = `Node.js ${data.node}`
  document.getElementById('stamp').textContent = `Сборка: ${data.generatedAt} · Среда: ${data.node}`
  document.getElementById('trace').textContent = data.logs.map(entry => `${entry.level === 'error' ? '[error] ' : ''}${entry.text}`).join('\n')
  return data
}
const showLoadError = error => {
  const output = document.getElementById('trace-error')
  output.hidden = false; output.textContent = error.message
  document.getElementById('trace').textContent = 'Запись недоступна. Пересоберите проект и обновите страницу.'
  document.getElementById('stamp').textContent = 'Нет данных о сборке'
}
loadDemo().then(data => {
  const steps = ['Перший виклик', 'Останній виклик', ...data.result.order.map(name => `Виконано ${name}`)]
  const timeline = document.getElementById('timeline')
  const next = document.getElementById('next')
  const replay = document.getElementById('replay')
  let index = 0
  for (const [i, text] of steps.entries()) {
    const row = document.createElement('div'); row.className = 'step'
    const number = document.createElement('span'); number.textContent = String(i + 1).padStart(2, '0')
    row.append(number, document.createTextNode(text)); timeline.append(row)
  }
  next.disabled = false; replay.disabled = false; status('Нажмите «Следующий шаг», чтобы прочитать порядок выполнения.')
  next.addEventListener('click', () => {
    timeline.children[index].classList.add('active')
    status(`Шаг ${index + 1} из ${steps.length}: ${steps[index]}`)
    index++; next.disabled = index === steps.length
  })
  replay.addEventListener('click', () => { index = 0; next.disabled = false; for (const row of timeline.children) row.classList.remove('active'); status('Запись возвращена к началу.') })
}).catch(showLoadError)
