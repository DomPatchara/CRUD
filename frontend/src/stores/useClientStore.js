import { create } from 'zustand';


const emptyInput = { name:"", email: "", job: "", rate: "", isactive: ""}

export const useClientStore = create((set) => ({

    // Keep All Clients State
    clients:[],
    setClients: (data) => set({clients: data}),
    removeClient: (id) => set((state) => state.clients.filter((c) => c.id !== id)), // optional update UI

    selectedId: '',
    setSelectedId: (id) => set({ selectedId: id }),

    // Handle Form Input
    user:{...emptyInput},
    setUser: (newType) => set({user: newType}),
    clearInput: () => set({user: {...emptyInput}}),
    
    // SearchTerm
    searchTerm: '',
    setSearchTerm: (term) => set({searchTerm: term}),
    
    // Handle Modal Form
    isOpen: false,
    setIsOpen: (open) => set({isOpen: open}),
    modalMode: "add",
    setModalMode: (mode) => set({modalMode: mode}),
}))