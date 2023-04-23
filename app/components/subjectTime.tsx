export default function SubjectTime({ pars }: { pars: number }) {
  return <div className="block flex-auto w-2 ">
    <div className="block w-2 bg-blue-300 rounded-lg" style={({height:pars+"%"})}></div>
  </div>
}