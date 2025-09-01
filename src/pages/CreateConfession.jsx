import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import MainLayout from "@/components/main-layout"
import ConfessionService from "@/services/ConfessionService"

export default function CreateConfessionPage() {
  const [confession, setConfession] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!confession.trim()) return

    setLoading(true)
    setSuccess(false)

    try {
      await ConfessionService.createConfessions({
        content: confession
      })

      setSuccess(true)
      setConfession("")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <h2 className="text-xl font-bold mb-4">✍️ Create Confession</h2>

      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Textarea
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              placeholder="Write your confession anonymously..."
              className="resize-none h-32"
            />

            <Button type="submit" disabled={loading || !confession.trim()}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Submitting...
                </>
              ) : (
                "Post Confession"
              )}
            </Button>

            {success && (
              <p className="text-green-600 text-sm">
                ✅ Your confession has been submitted!
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
