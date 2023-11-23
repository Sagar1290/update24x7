const NewsCard = ({ data }) => {

    return (
        <div className="">
            <h1 className="font-bold text-lg p-2 bg-slate-300 rounded-xl text-center dark:text-gray-600">{data.source.name}</h1>
            <h1 className="p-2 h-20 text-md">{data["title"].substring(0, 120)}</h1>
            <img src={data.urlToImage ? data.urlToImage : `https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} className="h-48 p-2 m-auto" />
            <p className="p-2 text-gray-500">{data.description}</p>
            <p className="p-2">
                {data.content.substring(0, 180)}...
                <a href={data.url} className="text-blue-600 no-underline hover:underline">Read More</a>
            </p>
        </div>
    )

}

export default NewsCard