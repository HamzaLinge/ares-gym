export default async function TitlePage({ title }: { title?: string }) {
  if (!title) return null;
  return <h1 className="w-full text-center text-5xl capitalize">{title}</h1>;
}
