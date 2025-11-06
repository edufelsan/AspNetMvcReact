import * as React from "react"
import { ArrowUpDown } from "lucide-react"
import { useLocale } from '@/hooks/useLocale'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DataTable,
  type ColumnDef,
} from "@/components/ui/data-table"

interface Campaign {
  id: string
  name: string
  team: string
  status: "Active" | "Paused" | "Planning"
  budget: number
  updatedAt: string
  clickRate: number
}

const campaigns: Campaign[] = [
  {
    id: "cmp-1024",
    name: "Spring Launch",
    team: "Growth",
    status: "Active",
    budget: 12000,
    updatedAt: "2025-10-19T15:42:00Z",
    clickRate: 3.6,
  },
  {
    id: "cmp-2048",
    name: "Black Friday Countdown",
    team: "Lifecycle",
    status: "Planning",
    budget: 18500,
    updatedAt: "2025-10-17T09:12:00Z",
    clickRate: 4.3,
  },
  {
    id: "cmp-3011",
    name: "Customer Reactivation",
    team: "CRM",
    status: "Paused",
    budget: 7600,
    updatedAt: "2025-10-14T20:24:00Z",
    clickRate: 2.9,
  },
  {
    id: "cmp-4120",
    name: "Brand Awareness LATAM",
    team: "Brand",
    status: "Active",
    budget: 23300,
    updatedAt: "2025-10-11T12:06:00Z",
    clickRate: 5.1,
  },
  {
    id: "cmp-5092",
    name: "Referral Boost",
    team: "Product Marketing",
    status: "Active",
    budget: 9800,
    updatedAt: "2025-10-10T08:30:00Z",
    clickRate: 3.2,
  },
  {
    id: "cmp-6115",
    name: "Retention Sprint",
    team: "Growth",
    status: "Planning",
    budget: 8700,
    updatedAt: "2025-10-08T18:54:00Z",
    clickRate: 2.4,
  },
  {
    id: "cmp-7099",
    name: "Holiday Remarketing",
    team: "Lifecycle",
    status: "Paused",
    budget: 15400,
    updatedAt: "2025-10-06T16:48:00Z",
    clickRate: 3.8,
  },
  {
    id: "cmp-8112",
    name: "Influencer Collab",
    team: "Brand",
    status: "Active",
    budget: 19800,
    updatedAt: "2025-10-05T11:15:00Z",
    clickRate: 4.7,
  },
]

const columns: ColumnDef<Campaign>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(Boolean(value))}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 24,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Campaign
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium leading-snug">{row.getValue("name")}</span>
        <span className="text-xs text-muted-foreground">{row.original.id}</span>
      </div>
    ),
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.getValue("team")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Campaign["status"]
      const variant =
        status === "Active"
          ? "default"
          : status === "Paused"
          ? "secondary"
          : "outline"

      return (
        <Badge variant={variant} className="uppercase">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => {
      const value = row.getValue("budget") as number
      return (
        <span className="tabular-nums">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0,
          }).format(value)}
        </span>
      )
    },
  },
  {
    accessorKey: "clickRate",
    header: "CTR",
    cell: ({ row }) => {
      const value = row.getValue("clickRate") as number
      return <span className="tabular-nums">{value.toFixed(1)}%</span>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const value = row.getValue("updatedAt") as string
      const date = new Date(value)
      return (
        <div className="flex flex-col">
          <span className="tabular-nums">
            {date.toLocaleDateString("pt-BR")}
          </span>
          <span className="text-xs text-muted-foreground">
            {date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      )
    },
  },
]

export function DataTableDemo() {
  const { formatCurrency, formatDate, formatTime } = useLocale()
  
  const columnsWithLocale: ColumnDef<Campaign>[] = React.useMemo(() => [
    ...columns.slice(0, -2), // Pega todas as colunas exceto budget e createdAt
    {
      accessorKey: "budget",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            Budget
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const value = row.getValue("budget") as number
        return (
          <span className="tabular-nums">
            {formatCurrency(value)}
          </span>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const value = row.getValue("createdAt") as string
        const date = new Date(value)
        return (
          <div className="flex flex-col">
            <span className="tabular-nums">
              {formatDate(date)}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTime(date)}
            </span>
          </div>
        )
      },
    },
  ], [formatCurrency, formatDate, formatTime])

  const memoData = React.useMemo(() => campaigns, [])

  return (
    <DataTable
      columns={columnsWithLocale}
      data={memoData}
      enableGlobalFilter
      globalFilterPlaceholder="Search campaigns..."
      enableRowSelection
      initialPageSize={5}
      pageSizeOptions={[5, 10, 20]}
      toolbar={<Badge variant="outline">Campaigns snapshot</Badge>}
    />
  )
}
