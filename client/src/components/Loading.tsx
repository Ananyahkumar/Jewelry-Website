import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
    return (
        <div>
            <div className="lg:grid grid-cols-3 m-5">
                {Array(8).fill(0).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-[250px] w-[420px] rounded-sm m-4" />
                        <div className="space-y-2 space-x-2 m-4">
                            <Skeleton className="h-4 w-[60px]" />
                            <Skeleton className="h-4 w-[60px]" />
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-10 w-[290px]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
