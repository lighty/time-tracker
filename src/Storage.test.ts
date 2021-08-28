import * as Storage from "./Storage"
// @ponicode
describe("Storage.saveEntries", () => {
    test("0", () => {
        let param1: any = [{ id: "bc23a9d531064583ace8f67dad60f6bb", isTracking: false, startAt: 50, stopAt: 7588892, task: { id: "bc23a9d531064583ace8f67dad60f6bb", name: "Jean-Philippe", project: { id: 56784, name: "Michael" } } }, { id: 12345, isTracking: false, startAt: 350, stopAt: "c466a48309794261b64a4f02cfcc3d64", task: { id: 987650, name: "Jean-Philippe", project: { id: 12345, name: "Jean-Philippe" } } }]
        let callFunction: any = () => {
            Storage.saveEntries(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1: any = [{ id: "a1969970175", isTracking: true, startAt: 550, stopAt: 9876, task: { id: 987650, name: "Anas", project: { id: 987650, name: "Pierre Edouard" } } }, { id: "a1969970175", isTracking: true, startAt: 100, stopAt: 7588892, task: { id: "bc23a9d531064583ace8f67dad60f6bb", name: "Pierre Edouard", project: { id: 56784, name: "Jean-Philippe" } } }, { id: 12, isTracking: true, startAt: 90, stopAt: 9876, task: { id: 987650, name: "Edmond", project: { id: 12, name: "Michael" } } }]
        let callFunction: any = () => {
            Storage.saveEntries(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1: any = [{ id: "bc23a9d531064583ace8f67dad60f6bb", isTracking: false, startAt: 410, stopAt: 7588892, task: { id: 987650, name: "Pierre Edouard", project: { id: 12, name: "Michael" } } }, { id: 12345, isTracking: true, startAt: 520, stopAt: 12345, task: { id: 12, name: "Pierre Edouard", project: { id: 987650, name: "Pierre Edouard" } } }]
        let callFunction: any = () => {
            Storage.saveEntries(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1: any = [{ id: 12345, isTracking: false, startAt: 320, stopAt: 7588892, task: { id: 987650, name: "Jean-Philippe", project: { id: "a1969970175", name: "Jean-Philippe" } } }, { id: 12, isTracking: false, startAt: 520, stopAt: 12345, task: { id: "a1969970175", name: "Edmond", project: { id: 56784, name: "Edmond" } } }, { id: 12345, isTracking: false, startAt: 550, stopAt: "bc23a9d531064583ace8f67dad60f6bb", task: { id: 987650, name: "George", project: { id: 12, name: "Michael" } } }]
        let callFunction: any = () => {
            Storage.saveEntries(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1: any = [{ id: "bc23a9d531064583ace8f67dad60f6bb", isTracking: false, startAt: 400, stopAt: 9876, task: { id: 987650, name: "Michael", project: { id: 987650, name: "Pierre Edouard" } } }]
        let callFunction: any = () => {
            Storage.saveEntries(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            Storage.saveEntries([])
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("Storage.saveTasks", () => {
    test("0", () => {
        let param1: any = [{ id: "bc23a9d531064583ace8f67dad60f6bb", name: "George", project: { id: "bc23a9d531064583ace8f67dad60f6bb", name: "Anas" } }, { id: 12, name: "Pierre Edouard", project: { id: "bc23a9d531064583ace8f67dad60f6bb", name: "Jean-Philippe" } }, { id: "a1969970175", name: "Edmond", project: { id: "bc23a9d531064583ace8f67dad60f6bb", name: "Pierre Edouard" } }]
        let callFunction: any = () => {
            Storage.saveTasks(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1: any = [{ id: 12345, name: "Pierre Edouard", project: { id: 12345, name: "Michael" } }, { id: 987650, name: "Michael", project: { id: 12, name: "Edmond" } }]
        let callFunction: any = () => {
            Storage.saveTasks(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1: any = [{ id: "bc23a9d531064583ace8f67dad60f6bb", name: "Pierre Edouard", project: { id: 987650, name: "Edmond" } }, { id: "bc23a9d531064583ace8f67dad60f6bb", name: "Anas", project: { id: "a1969970175", name: "Anas" } }]
        let callFunction: any = () => {
            Storage.saveTasks(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1: any = [{ id: 56784, name: "George", project: { id: 12, name: "Jean-Philippe" } }, { id: 987650, name: "Jean-Philippe", project: { id: "bc23a9d531064583ace8f67dad60f6bb", name: "Pierre Edouard" } }, { id: 12, name: "Michael", project: { id: "a1969970175", name: "Pierre Edouard" } }]
        let callFunction: any = () => {
            Storage.saveTasks(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1: any = [{ id: 987650, name: "Edmond", project: { id: 56784, name: "Michael" } }, { id: 12345, name: "Pierre Edouard", project: { id: 56784, name: "Pierre Edouard" } }]
        let callFunction: any = () => {
            Storage.saveTasks(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            Storage.saveTasks([])
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("Storage.loadTasks", () => {
    test("0", () => {
        let callFunction: any = () => {
            Storage.loadTasks()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("Storage.saveProjects", () => {
    test("0", () => {
        let param1: any = [{ id: "bc23a9d531064583ace8f67dad60f6bb", name: "Pierre Edouard" }, { id: 12, name: "George" }, { id: "bc23a9d531064583ace8f67dad60f6bb", name: "Edmond" }, { id: 987650, name: "George" }]
        let callFunction: any = () => {
            Storage.saveProjects(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1: any = [{ id: "a1969970175", name: "George" }]
        let callFunction: any = () => {
            Storage.saveProjects(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1: any = [{ id: 12, name: "Anas" }, { id: "a1969970175", name: "Jean-Philippe" }, { id: 987650, name: "Edmond" }]
        let callFunction: any = () => {
            Storage.saveProjects(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1: any = [{ id: 12, name: "Anas" }, { id: 12345, name: "Michael" }, { id: 12, name: "Jean-Philippe" }, { id: "a1969970175", name: "Michael" }]
        let callFunction: any = () => {
            Storage.saveProjects(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1: any = [{ id: 12345, name: "Anas" }, { id: 12, name: "Jean-Philippe" }, { id: "bc23a9d531064583ace8f67dad60f6bb", name: "George" }]
        let callFunction: any = () => {
            Storage.saveProjects(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            Storage.saveProjects([])
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("Storage.loadProjects", () => {
    test("0", () => {
        let callFunction: any = () => {
            Storage.loadProjects()
        }
    
        expect(callFunction).not.toThrow()
    })
})
