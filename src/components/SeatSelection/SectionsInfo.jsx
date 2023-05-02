import { SectionRowInfo } from "./SectionRowInfo"

function SectionsInfo({ handleSeatsBySection }) {
    return (
        <div style={{ width: '80%' }} className="text-xl font-bold space-y-4  py-10">
            <SectionRowInfo color="rgb(234 179 8)" section="A" handleSeatsBySection={handleSeatsBySection} />
            <SectionRowInfo color="rgb(59 130 246)" section="B" handleSeatsBySection={handleSeatsBySection} />
            <SectionRowInfo color="rgb(239 68 68)" section="C" handleSeatsBySection={handleSeatsBySection} />
            <SectionRowInfo color="rgb(139 92 246)" section="D" handleSeatsBySection={handleSeatsBySection} />
        </div>
    )
}
export { SectionsInfo }