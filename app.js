const billData = document.querySelector('[data-bill]')
const tipData = document.querySelectorAll('[data-tip]')
const customTipData = document.querySelector('[data-tip-custom]')
const peopleData = document.querySelector('[data-people]')
const resetButton = document.querySelector('[data-reset]')
const tipPerPeople = document.querySelector('[data-tip-per-person]')
const totalPerPeople = document.querySelector('[data-total-per-person]')

class TipCalculator {
  constructor(tipPerPeople, totalPerPeople) {
    this.tipPerPeople = tipPerPeople
    this.totalPerPeople = totalPerPeople
    this.reset()
  }

  reset() {

    resetButton.setAttribute("disabled", "disabled")

    // reset var
    this.bill = ""
    this.tip = ""
    this.people = ""
    // reset display value
    billData.value = ""
    tipData.value = ""
    peopleData.value = ""
    // reset innerText (because i put it in a if statment it won't reset because above is set to "")
    this.tipPerPeople.innerText = "$0.00"
    this.totalPerPeople.innerText = "$0.00"

    // don't work/// hmmm
    // if (billData.classList.contains("error")) {
    //   billData.classList.remove("error")
    // }
    // if (tipData.classList.contains("error")) {
    //   tipData.classList.remove("error")
    // }

    // if (peopleData.classList.contains("error")) {
    //   peopleData.classList.remove("error")
    // }
  }

  // assigning bill tip and people
  chooseBill(number) {
    this.bill = number
  }
  chooseTip(number) {
    this.tip = this.bill * number / 100
  }
  choosePeople(number) {
    this.people = number
  }

  updateDisplay() {
    const vaild = this.bill == "" || this.tip == "" || this.people == ""

    if (!vaild) {
      // to get the round number of 2 dec place => Math.round(num * 100) / 100 
      this.tipPerPeople.innerText = Math.round(this.tip / this.people * 100) / 100
      this.totalPerPeople.innerText = Math.round((this.bill + this.tip) / this.people * 100) / 100
    }
  }

}

// set up new tip calculator
const tipCalculator = new TipCalculator(tipPerPeople, totalPerPeople)

// get bill amount
billData.addEventListener('input', () => {
  if (billData.value <= 0) {
    document.querySelector('.bill-text').classList.add("error")
  } else {
    document.querySelector('.bill-text').classList.remove("error")
  }
  tipCalculator.chooseBill(Number(billData.value))
  tipCalculator.updateDisplay()
  resetButton.removeAttribute("disabled")
})
// get amount of people
peopleData.addEventListener('input', () => {
  if (peopleData.value <= 0) {
    document.querySelector('.people-text').classList.add("error")
  } else {
    document.querySelector('.people-text').classList.remove("error")
  }
  tipCalculator.choosePeople(Number(peopleData.value))
  tipCalculator.updateDisplay()
  resetButton.removeAttribute("disabled")

})

// foucs event on everything in select tip area

let prevButton = null
const tipbuttns = document.querySelector('.select-tip')
tipbuttns.addEventListener('click', (e) => {
  e.target.classList.add("active")
  if (prevButton != null) {
    // Delete the input text from the custom if the button is reselected
    if (prevButton != e.target.hasAttribute('data-tip-custom')) {
      customTipData.value = ""
    }
    prevButton.classList.remove('active')
  }
  prevButton = e.target

})

// get which button is click on
tipData.forEach(button => {
  button.addEventListener('click', () => {
    tipCalculator.chooseTip(Number(button.innerText))
    tipCalculator.updateDisplay()
  })
})
// get input for custom tip
customTipData.addEventListener('input', () => {
  if (customTipData.value <= 0) {
    document.querySelector('.select-text').classList.add("error")
  } else {
    document.querySelector('.select-text').classList.remove("error")
  }
  tipCalculator.chooseTip(Number(customTipData.value))
  tipCalculator.updateDisplay()
})

// resets when the button is press
resetButton.addEventListener('click', () => {

  tipCalculator.reset()
  tipCalculator.updateDisplay()
})


// add to local storage 