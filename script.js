let localArrayList = []
let elemTaskList = document.getElementById('taskList')

const removeTask = index => {
	localArrayList.splice(index, 1)

	elemTaskList.innerHTML = ''

	localStorage.setItem('tasks', JSON.stringify(localArrayList))

	localArrayList.forEach((value, index) => {
		elemTaskList.append(createTaskSection(value, index))
	})
}

const createTaskSection = (value, index) => {
	let elemTaskSection = document.createElement('section')
	elemTaskSection.className = 'taskSection'

	let elemTaskName = document.createElement('p')
	elemTaskName.className = 'baseText'
	elemTaskName.innerText = `${index + 1}. ${value}`

	let elemRemoveTask = document.createElement('button')
	elemRemoveTask.className = 'removeButton'
	elemRemoveTask.innerHTML = '<span class="material-icons md-size">task_alt</span>'
	elemRemoveTask.addEventListener('click', () => {
		removeTask(index)
	})

	elemTaskSection.append(elemTaskName)
	elemTaskSection.append(elemRemoveTask)

	return elemTaskSection
}

onload = () => {
	if (localStorage.getItem('tasks')) {
		let tasks = JSON.parse(localStorage.getItem('tasks'))

		for (let task of tasks) {
			localArrayList.push(task)
		}
	}

	localArrayList.forEach((value, index) => {
		elemTaskList.append(createTaskSection(value, index))
	})
}

let elemTaskInput = document.getElementById('taskInput')

elemTaskInput.onkeydown = e => {
  e.key === 'Enter' && addTask()
}

const addTask = () => {
	let taskInput = elemTaskInput.value

	if (taskInput !== '') {
		localArrayList.push(taskInput)

		elemTaskList.append(createTaskSection(taskInput, localArrayList.length - 1))

		localStorage.setItem('tasks', JSON.stringify(localArrayList))

		elemTaskInput.value = ''
	}
}

const clearTasks = () => {
	localStorage.clear()

	localArrayList = []

	elemTaskList.innerHTML = ''
}

let elemAddTask = document.getElementById('addTask')
elemAddTask.addEventListener('click', addTask)

let elemClearTasks = document.getElementById('clearTasks')
elemClearTasks.addEventListener('click', clearTasks)

let elemDate = document.getElementsByClassName('date')[0]
elemDate.innerHTML = new Date().toLocaleDateString()
