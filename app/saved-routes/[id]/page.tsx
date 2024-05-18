export default function Page({ params }: { params: { id: string } }) {
  return <h1>My Route {params.id}</h1>;
}
