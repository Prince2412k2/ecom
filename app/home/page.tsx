import { Sheet } from "../lib/dbcon"


export default async function Home() {
  const sheetObj = new Sheet()
  // const data = await sheetObj.getProducts({ from: 1, to: 10 })
  // await sheetObj.getUsers({ name: "Patel", id: 15 })
  // const data = await sheetObj.getProducts({ from: 5, to: 11 })
  const data = await sheetObj.getUsers({ name: "animesh" })
  if (!data === null) { return (<div>Error</div>) }

  return (<div>{data}</div>)
  // return (
  //   <div className="flex flex-col text-xl items-center align-middle">
  //     <table>
  //       <thead>
  //         <tr><td>id</td><td>name</td></tr>
  //       </thead>
  //       <tbody>
  //         {data.map((i, index) => {
  //           return (
  //             <tr key={index}>
  //               <td> {i[0]}</td>
  //               <td> {i[1]}</td>
  //               <td> {i[2]}</td>
  //             </tr>
  //           )
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // )
}
