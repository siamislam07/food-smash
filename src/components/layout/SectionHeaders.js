export default function SectionHeaders({ subHeader, mainHeading }) {
    return (
        <>
            <h3 className="uppercase text-gray-600 font-semibold  leading-4">
                {subHeader}
            </h3>
            <h2 className="text-primary font-bold text-4xl italic">
                {mainHeading}
            </h2>
        </>

    )
}