import { SectionRowInfo } from "./SectionRowInfo"

function SectionsInfo(){
    return(
        <div style={{width:'80%'}}className="text-xl font-bold space-y-4  py-10">
            <SectionRowInfo  color="rgb(234 179 8)" section="A" />
            <SectionRowInfo color="rgb(59 130 246)" section="B" />
            <SectionRowInfo color="rgb(239 68 68)" section="C" />
            <SectionRowInfo color="rgb(139 92 246)" section="D" />
        </div>
    )
}
export { SectionsInfo }