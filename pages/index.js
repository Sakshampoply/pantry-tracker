import React, { useState, useEffect } from "react"
import { collection, addDoc, getDoc, QuerySnapshot, query, onSnapshot, deleteDoc, doc, where, getDocs } from "firebase/firestore"
import { db } from "../firebase"



export default function Home() {

  const [items, setItem] = useState([])

  const [newItem, setNewItem] = useState({ name: "", price: "" })
  const [search, setSearch] = useState("")

  const addItem = async (e) => {
    e.preventDefault()
    if (newItem.name !== " " && newItem.price !== " ") {
      await addDoc(collection(db, "items"),
        {
          name: newItem.name.trim(),
          price: newItem.price
        })
      setNewItem({ name: "", price: "" });
    }
  }

  useEffect(
    () => {
      const q = query(collection(db, "items"))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let itemsArray = []

        querySnapshot.forEach((doc) => {
          itemsArray.push({ ...doc.data(), id: doc.id })
        })
        setItem(itemsArray);

        const CalculateTotal = () => {
          const total = itemsArray.reduce((acc, item) => {
            return acc + parseFloat(item.price)
          }, 0)
          setTotal(total)
        }
        CalculateTotal();
        return () => {
          unsubscribe();
        }
      })
    }, []
  )

  const [total, setTotal] = useState(0)

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id))
  }

  const searchItem = async (e) => {
    const citiesRef = collection(db, "items");
    const q = query(citiesRef, where("name", "==", { search }));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  return (
    <div className="p-10">
      <h1 className="flex justify-center text-6xl p-4">Pantry Tracker</h1>
      <div className="flex justify-center border-black">
        <form>
          <input type="text" name="name" className="p-2 mx-4 text-2xl text-black" placeholder="Item Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
          <input type="text" name="price" className="p-2 mx-4 text-2xl text-black" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
          <button type="submit" onClick={addItem} className="p-2 text-4xl hover:bg-black" >+</button>
        </form>
        {/* <form>
          <input type="text" name="search" className="p-2 mx-4 text-2xl text-black" placeholder="Search" onChange={(e) => setSearch({ ...search, name: e.target.value })} />
          <button type="submit" onClick={searchItem} className="p-2 text-4xl hover:bg-black" >?</button>
        </form> */}
      </div>
      <div className="sm:p-20">
        <ul className="text-2xl">
          {items.map((item, id) => (
            <li key={id} className="flex justify-between">
              <span className="p-4">{item.name}</span><span className="p-4">${item.price}</span>
              <button onClick={() => deleteItem(item.id)} className="p-2 hover:bg-black">X</button>
            </li>
          ))}
        </ul>
        {
          items.length > 0 ? (
            <div className="flex justify-between bg-black p-4 text-2xl">
              <span>Total</span><span>${total}</span>
            </div>
          ) : ("")
        }
      </div >
    </div>
  );
}
