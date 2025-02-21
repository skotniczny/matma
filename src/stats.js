class Stats {
  #dict = {}

  add (key, isCorrect) {
    if (this.#dict[key]) {
      this.#dict[key].repetitions++
      if (isCorrect) this.#dict[key].correctAnswers++
    } else {
      this.#dict[key] = { repetitions: 1, correctAnswers: isCorrect ? 1 : 0 }
    }
  }

  get () {
    const output = []
    const entries = Object.entries(this.#dict)
    for (const item of entries) {
      const [key, { repetitions, correctAnswers }] = item
      output.push([key, repetitions, correctAnswers])
    }
    return output
  }
}

export default Stats
