import dbConnect from './DB/connectDB';

export default function Home() {
  dbConnect();
  return <div className=''>Work out plan</div>;
}
