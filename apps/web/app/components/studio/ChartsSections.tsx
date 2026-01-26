'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@thesage/ui';
import { Card } from '@thesage/ui';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis, YAxis, Label,
  ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig
} from '@thesage/charts';

type ChartsTab = 'overview' | 'area-chart' | 'bar-chart' | 'line-chart' | 'pie-chart';

interface ChartsSectionsProps {
  activeItemId?: string;
  breadcrumbs?: BreadcrumbItemLegacy[];
  onItemChange?: (itemId: string) => void;
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--color-secondary)",
  },
} satisfies ChartConfig;

// ... imports
import { Button, CollapsibleCodeBlock } from '@thesage/ui';
import { Copy, Eye, EyeOff } from 'lucide-react';

// ... (existing imports and types)

// ... (existing chartData and chartConfig)

const BAR_CHART_CODE = `import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@thesage/charts"

export function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
`;

const LINE_CHART_CODE = `import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@thesage/charts"

export function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="desktop"
          type="natural"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
`;

const AREA_CHART_CODE = `import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@thesage/charts"

export function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="mobile"
          type="natural"
          fill="url(#fillMobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="url(#fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
`;

const PIE_CHART_CODE = `import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@thesage/charts"

export function Component() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.desktop, 0)
  }, [])

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="desktop"
          nameKey="month"
          innerRadius={60}
          strokeWidth={5}
          startAngle={90}
          endAngle={-270}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Visitors
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
`;

function ChartPreview({ title, children, code }: { title: string; children: React.ReactNode; code: string }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCode(!showCode)}
          className="gap-2"
        >
          {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
          {showCode ? 'Hide Code' : 'View Code'}
        </Button>
      </div>
      <Card className="flex flex-col overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          {children}
        </div>
        {showCode && (
          <div className="bg-[var(--color-surface-subtle)] border-t border-[var(--color-border)] p-4">
            <CollapsibleCodeBlock
              id={`code-${title.toLowerCase().replace(/\s+/g, '-')}`}
              title="Source"
              language="tsx"
              code={code}
              defaultCollapsed={false}
              showCopy={true}
            />
          </div>
        )}
      </Card>
    </div>
  );
}

export function ChartsSections({ activeItemId, breadcrumbs, onItemChange }: ChartsSectionsProps) {
  const [activeTab, setActiveTab] = useState<ChartsTab>('overview');

  useEffect(() => {
    if (activeItemId) {
      setActiveTab(activeItemId as ChartsTab);
    }
  }, [activeItemId]);

  return (
    <div className="w-full min-w-0">
      <div className="mb-8">
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-4">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      <div className="mt-4">
        {activeTab === 'overview' && (
          <section className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">Charts</h1>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                Beautiful, responsive, and composable charts built with Recharts and styled with Tailwind CSS.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <Card className="p-6 cursor-pointer hover:border-[var(--color-primary)] transition-colors" onClick={() => onItemChange?.('area-chart')}>
                  <div className="mb-4 pointer-events-none">
                    <ChartContainer config={chartConfig} className="aspect-auto h-[100px] w-full">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="fillDesktopOv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <Area dataKey="desktop" type="natural" fill="url(#fillDesktopOv)" stroke="var(--color-desktop)" strokeWidth={2} />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Area Chart</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Stacked, gradient, and percent area charts.</p>
                </Card>
                <Card className="p-6 cursor-pointer hover:border-[var(--color-primary)] transition-colors" onClick={() => onItemChange?.('bar-chart')}>
                  <div className="mb-4 pointer-events-none">
                    <ChartContainer config={chartConfig} className="aspect-auto h-[100px] w-full">
                      <BarChart data={chartData}>
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={2} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Bar Chart</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Vertical, horizontal, stacked, and grouped bar charts.</p>
                </Card>
                <Card className="p-6 cursor-pointer hover:border-[var(--color-primary)] transition-colors" onClick={() => onItemChange?.('line-chart')}>
                  <div className="mb-4 pointer-events-none">
                    <ChartContainer config={chartConfig} className="aspect-auto h-[100px] w-full">
                      <LineChart data={chartData}>
                        <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ChartContainer>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Line Chart</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Multi-axis, step, and smooth line charts.</p>
                </Card>
                <Card className="p-6 cursor-pointer hover:border-[var(--color-primary)] transition-colors" onClick={() => onItemChange?.('pie-chart')}>
                  <div className="mb-4 pointer-events-none flex justify-center">
                    <ChartContainer config={chartConfig} className="aspect-square h-[100px]">
                      <PieChart>
                        <Pie data={chartData} dataKey="desktop" innerRadius={25} outerRadius={40} strokeWidth={2} startAngle={90} endAngle={-270} />
                      </PieChart>
                    </ChartContainer>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Pie Chart</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Pie and donut charts with center content.</p>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* --- BAR CHART --- */}
        {activeTab === 'bar-chart' && (
          <ChartPreview title="Bar Chart" code={BAR_CHART_CODE}>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </ChartPreview>
        )}

        {/* --- LINE CHART --- */}
        {activeTab === 'line-chart' && (
          <ChartPreview title="Line Chart" code={LINE_CHART_CODE}>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <LineChart
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="desktop"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </ChartPreview>
        )}

        {/* --- AREA CHART --- */}
        {activeTab === 'area-chart' && (
          <ChartPreview title="Area Chart" code={AREA_CHART_CODE}>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <AreaChart
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="url(#fillMobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="url(#fillDesktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </ChartPreview>
        )}

        {/* --- PIE CHART --- */}
        {activeTab === 'pie-chart' && (
          <ChartPreview title="Pie Chart" code={PIE_CHART_CODE}>
            <Card className="flex flex-col p-6 border-0 shadow-none">
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] w-full">
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={chartData}
                    dataKey="desktop"
                    nameKey="month"
                    innerRadius={60}
                    strokeWidth={5}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {chartData.reduce((acc, curr) => acc + curr.desktop, 0).toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Visitors
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </Card>
          </ChartPreview>
        )}
      </div>
    </div>
  );
}
