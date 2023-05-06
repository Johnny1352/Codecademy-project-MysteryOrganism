// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    mutate() {
      const baseLocation = Math.floor(Math.random() * 15);
      // console.log(baseLocation);
      const initialBase = this.dna[baseLocation];
      // console.log(initialBase);
      this.dna[baseLocation] = returnRandBase();
      // console.log(this.dna[baseLocation]);
      while (this.dna[baseLocation] === initialBase) {
        this.dna[baseLocation] = returnRandBase();
      }
      return this.dna;
    },

    compareDNA(pAequor) {
      let count = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          count++;
        }
      }
      console.log(
        `Specimen ${this.specimenNum} and specimen ${
          pAequor.specimenNum
        } have ${Math.round((count / 15) * 100)}% DNA in common`
      );
    },

    willLikelySurvive() {
      let count = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          count++;
        }
      }
      if (Math.round((count / 15) * 100) > 60) {
        return true;
      } else {
        return false;
      }
    },
  };
};

// const test1 = pAequorFactory(1, mockUpStrand());
// const test2 = pAequorFactory(2, mockUpStrand());
// console.log(test1.dna);
// test1.mutate();
// console.log(test1.dna);
// console.log(test2.dna);
// test1.compareDNA(test2);
// console.log(test1.willLikelySurvive());

const survivors = [];
let specimen = 1;
while (survivors.length < 30) {
  const organism = pAequorFactory(specimen, mockUpStrand());
  if (organism.willLikelySurvive()) {
    survivors.push(organism);
    // console.log("This organism can survive");
    specimen++;
  }
}
// console.log(survivors, survivors.length);
