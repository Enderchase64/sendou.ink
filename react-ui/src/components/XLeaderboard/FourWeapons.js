import React from "react"
import { Popup } from "semantic-ui-react"
import { useSelector } from "react-redux"
import weaponDict from "../../utils/english_internal.json"
import { modes, months } from "../../utils/lists"

const FourWeapons = ({ weapons }) => {
  const localization = useSelector(state => state.localization)
  return (
    <>
      {weapons.map(w => {
        const mode = modes[w.mode]
        const month = months[w.month]
        return (
          <Popup
            key={`${mode}${month}${w.year}`}
            trigger={
              <img
                style={{ height: "60px", width: "60px" }}
                src={`https://raw.githubusercontent.com/Leanny/leanny.github.io/master/splat2/weapons/Wst_${
                  weaponDict[w["weapon"]]
                }.png`}
                alt={w.name}
              />
            }
            header={w.name}
            content={`${w.x_power} (${w.rank} ${
              localization[mode]
            } - ${localization[month]} ${w.year})`}
          />
        )
      })}
    </>
  )
}

export default FourWeapons
