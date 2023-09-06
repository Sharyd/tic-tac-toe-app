import { Oval } from 'react-loader-spinner'

interface Props {
    color?: string
}

const Spinner = ({ color }: Props) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <Oval
                height={80}
                width={80}
                color={color}
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor={color}
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    )
}

export default Spinner
